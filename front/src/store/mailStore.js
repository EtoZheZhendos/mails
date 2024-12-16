import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useMailStore = defineStore("mail", {
  state: () => ({
    incomingEmails: [],
    outgoingEmails: [],
    selectedMail: null,
    loading: false,
    error: null,
  }),
  getters: {
    getIncomingEmails: (state) => state.incomingEmails,
    getOutgoingEmails: (state) => state.outgoingEmails,
    getSelectedMail: (state) => state.selectedMail,
  },
  actions: {
    async fetchIncomingMails() {
      this.loading = true;
      this.error = null;
      try {
        const response = await api({
          url: "/mail/incoming",
          method: "GET",
        });
        this.incomingEmails = response.data;
      } catch (error) {
        this.error = "Не удалось загрузить входящие письма. Попробуйте позже.";
      } finally {
        this.loading = false;
      }
    },

    async fetchOutgoingMails() {
      this.loading = true;
      this.error = null;
      try {
        const response = await api({
          url: "/mail/outgoing",
          method: "GET",
        });
        this.outgoingEmails = response.data;
      } catch (error) {
        this.error = "Не удалось загрузить исходящие письма. Попробуйте позже.";
      } finally {
        this.loading = false;
      }
    },

    async fetchMailById(id) {
      this.loading = true;
      this.error = null;
      try {
        const response = await api({
          url: `/mail/byId/${id}`,
          method: "GET",
        });
        return response;
      } catch (error) {
        this.error = "Не удалось загрузить письмо. Попробуйте позже.";
      } finally {
        this.loading = false;
      }
    },

    async sendMail(mail) {
      this.loading = true;
      this.error = null;
      try {
        const response = await api({
          url: "/mail/add_mail",
          method: "POST",
          data: mail,
        });
        await this.fetchOutgoingMails();
      } catch (error) {
        this.error = "Не удалось отправить письмо. Попробуйте позже.";
      } finally {
        this.loading = false;
      }
    },

    async deleteMail(id) {
      this.loading = true;
      this.error = null;
      try {
        await api({
          url: `/mail/${id}`,
          method: "DELETE",
        });
        await this.fetchIncomingMails();
        await this.fetchOutgoingMails();
      } catch (error) {
        this.error = "Не удалось удалить письмо. Попробуйте позже.";
      } finally {
        this.loading = false;
      }
    },

    async changeDraftToOutgoing(id, data_draft) {
      this.loading = true;
      this.error = null;

      const mailToSend = this.outgoingEmails.find((mail) => mail.id === id);

      if (!mailToSend) {
        this.error = "Письмо не найдено.";
        this.loading = false;
        return;
      }

      const updatedMail = {
        id: mailToSend.id,
        theme: mailToSend.theme,
        to: mailToSend.to,
        text: mailToSend.text,
        date: mailToSend.date,
        draft: false,
      };
      try {
        await api({
          url: `/mail/${id}`,
          method: "PUT",
          data: data_draft?.to ? data_draft : updatedMail,
        });

        await this.fetchOutgoingMails();
      } catch (error) {
        this.error = "Не удалось изменить статус письма. Попробуйте позже.";
      } finally {
        this.loading = false;
      }
    },

    searchMails(query) {
      const lowerCaseQuery = query.toLowerCase();

      this.incomingEmails = this.incomingEmails.filter(
        (mail) =>
          mail?.theme?.toLowerCase().includes(lowerCaseQuery) ||
          mail?.from?.toLowerCase().includes(lowerCaseQuery)
      );

      this.outgoingEmails = this.outgoingEmails.filter((mail) =>
        mail?.theme.toLowerCase().includes(lowerCaseQuery)
      );
    },
    async resetMails() {
      await this.fetchIncomingMails();
      await this.fetchOutgoingMails();
    },
  },
});
