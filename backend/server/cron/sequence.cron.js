import { CronJob } from "cron";
import moment from "moment";
import config from "../config/config";
import Campaign from "../models/campaign";
import Prospect from "../models/prospect";
import Conversation from "../models/conversation";
import { RestClient } from "@signalwire/node";

const client = new RestClient(
  config.signalwire.projectId,
  config.signalwire.token,
  { signalwireSpaceUrl: config.signalwire.space }
);

const sequenceEventsCron = new CronJob("*/60 * * * * *", async function () {
  const now = moment().toDate();
  const current = moment(now).format("HH:mm");
  const currentInMinutes = getIntegerMinutes(current);

  console.log("cron started");

  try {
    const campaigns = await Campaign.find().populate("sequence");

    for (const campaign of campaigns) {
      if (!campaign.sequence) continue;
      for (let i = 0; i < campaign.sequence.days.length; i++) {
        const day = campaign.sequence.days[i];
        const runDay = day.runDay;
        const runTime = day.runTime;
        if (runDay == undefined || runTime == "" || runTime == undefined)
          continue;

        for (let j = 0; j < day.events.length; j++) {
          const event = day.events[j];
          if (
            !event.content ||
            event.content == "" ||
            event.delay == undefined ||
            event.delay == ""
          )
            continue;

          let prospects = [];
          let start, end;

          if (runDay == 1) {
            start = now.getTime() - getIntegerMinutes(event.delay) * 60 * 1000;
            end = start + 60 * 1000;
          } else {
            const delayTime =
              getIntegerMinutes(runTime) + getIntegerMinutes(event.delay);
            if (currentInMinutes != delayTime) continue;
            start = moment(now)
              .subtract(runDay - 1, "days")
              .format("YYYY-MM-DD 00:00:00");
            end = moment(now)
              .subtract(runDay - 2, "days")
              .format("YYYY-MM-DD 00:00:00");
          }

          prospects = await Prospect.find({
            campaign: campaign._id,
            dateOfAssignment: { $gte: new Date(start), $lt: new Date(end) },
          });

          if (event.type == "sms") {
            const preservedWords = [
              "{{prospectFirstName}}",
              "{{myNameInSequence}}",
              "{{sequencePhone}}",
              "{{Address}}",
            ];

            let convertWords = [];

            convertWords[1] = campaign.sequence.name;
            convertWords[2] = campaign.sequence.phone;

            await Promise.all(
              prospects.map(async (prospect) => {
                convertWords[0] = prospect.firstName;
                convertWords[3] = prospect.address;
                let message = event.content;
                for (let i = 0; i < 4; i++) {
                  let pattern = new RegExp(preservedWords[i], "g");
                  message = message.replace(pattern, convertWords[i]);
                }

                const conversation = new Conversation({
                  message,
                  prospect: prospect._id,
                  method: "sms",
                });

                await conversation.save();

                const signalwireMessage = await client.messages.create({
                  from: config.signalwire.messagingNumber,
                  to: prospect.phone,
                  body: message,
                });
              })
            );
          }
        }
      }
    }

    // stopCron();
  } catch (e) {
    console.log(e);
  }
});

const getIntegerMinutes = (time) => {
  let h, m;
  h = (time.charAt(0) - "0") * 10 + (time.charAt(1) - "0");
  m = (time.charAt(3) - "0") * 10 + (time.charAt(4) - "0");
  return h * 60 + m;
};

const stopCron = () => {
  sequenceEventsCron.stop();
  console.log("cron stopped!");
};

module.exports = sequenceEventsCron;
