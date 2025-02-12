export default {
  afterUpdate: async (event) => {

    if (event.model.singularName === 'request') {
      const { result, previous } = event;
      const { chat_id, comment, request_status } = result
  
      if (request_status === 'pending') return

      const url = `https://api.telegram.org/bot${process.env.TG_BOT_TOKEN}/sendMessage`;
      const rejectedMessage = comment ? `❌ Ваша заявка отклонена. Причина: ${comment}` : '❌ Ваша заявка отклонена'
      const message = request_status === 'approved' ? '🎉 Ваша заявка одобрена! Желаем удачи!' : rejectedMessage
      const headers = new Headers();
      headers.append("Content-Type", "application/json");

      try {
        await fetch(url, { method: 'POST', headers, body: JSON.stringify({ chat_id, text: message }) })
        console.log('Message sent to Telegram');
      } catch (error) {
        console.error('Error sending message to Telegram:', error);
      }

    }    
  }
}