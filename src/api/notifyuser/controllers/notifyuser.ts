/**
 * A set of functions called "actions" for `notifyuser`
 */

export default {
  async create(ctx) {
    console.log(ctx.request.body);
    

    if (ctx.request.body?.model === "request") {
      const { chat_id, comment, request_status } = ctx.request.body?.entry
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      
      const rawData = JSON.stringify({
        chat_id,
        comment,
        request_status
      });
      
      try {
        await fetch(`${process.env.TG_BOT_URL}/notifyuser`, { method: 'POST', headers: myHeaders, body: rawData })
        return ctx.send({ message: "Message sent successfully!" });
      } catch (error) {
        return ctx.send({ message: "Error while sending message!" });
      }
    }
    




  },
};
