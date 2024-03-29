<template>
  <v-card>
    <v-form v-model="valid" @submit.prevent="submitForm()">
      <v-card-title>
        <span class="text-h5">Queue</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Name*"
                v-model="queueData.name"
                required
                :rules="stringRule('Name')"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12" md="10" lg="10">
              <v-text-field
                label="Host*"
                v-model="queueData.host"
                required
                :rules="stringRule('Host')"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="2" lg="2">
              <v-text-field
                label="Port*"
                v-model="queueData.port"
                required
                type="number"
                :rules="stringRule('Port')"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12" lg="12">
              <v-select
                :items="groups"
                item-text="name"
                item-value="id"
                label="Group*"
                v-model="queueData.groupId"
                required
                :rules="stringRule('Group')"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="12" lg="12">
              <v-textarea
                label="Description"
                rows="1"
                auto-grow
                v-model="queueData.description"
              ></v-textarea>
            </v-col>
            <v-col>
              <v-text-field label="Compliance" v-model="queueData.compliance"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <small>*Required</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary" text @click="closeDialog()">
          Close
        </v-btn>
        <v-btn color="secondary" text type="submit">
          Save
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IGroup } from "~/types/group";
import { IQueue, QueuePayload } from "~/types/queue";
export default defineComponent({
  name: "QueueForm",
  props: {
    queue: {} as PropType<IQueue | null>,
  },
  data() {
    return {
      page: 1,
      groups: [] as IGroup[],
      queueData: {} as QueuePayload,
      valid: true,
      stringRule: (name: string) => [(v: string) => !!v || `${name} is required`],
    };
  },
  mounted() {
    this.getGroups(1)
    if (this.queue && this.queue.id) {
      this.queueData = JSON.parse(JSON.stringify(this.queue))
    }
  },
  methods: {
    closeDialog() {
      this.queueData = {
        compliance: "",
        description: "",
        groupId: "",
        host: "",
        name: "",
        port: "",
      }
      this.$emit("close")
    },
    getGroups(page: number) {
      this.$api.group.getPaginated(page, 25).then((response) => {
        this.groups.push(...response.groups)
        this.page = page
      })
    },
    submitForm() {
      if (this.queue && this.queue.id) {
        this.$api.queue.edit(this.queue.id, this.queueData).then(() => {
          this.closeDialog()
        })

        return
      }

      this.$api.queue.create(this.queueData).then(() => {
        this.closeDialog()
      })
    }
  }
});
</script>
