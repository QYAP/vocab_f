<template>
  <div style="display: flex;flex-direction:column;justify-content: flex-start;align-items: center;">
    <div class="review-box"
      style="margin-top:120px;padding:35px 35px;display: flex;flex-direction:column;justify-content: center;align-items: center;box-shadow:0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);background-color:#FFF;">
      <div style="font-size: 38.5px;"
        v-if="reviewTask[reviewTask.length-1]">{{reviewTask[reviewTask.length-1].english}}</div>
      <div style="width:450px;margin-top:30px;display:flex;justify-content:space-around;">
        <div style="font-size: 18px;">
          <span>UK</span>
          <span style="margin-left:10px;color:#999;">/flɔː(r) dɪˈvɪʒn/</span>
        </div>
        <div style="font-size: 18px;">
          <span>US</span>
          <span style="margin-left:10px;color:#999;">/flɔːr dɪˈvɪʒn/</span>
        </div>
      </div>
      <div v-if="translation_or_not"
        style="width:480px;margin-top:35px;text-align:left;display:flex;justify-content:space-around;align-items:center;">
        <div style="padding:10px 10px;border:1px solid #C0C0C0;"
          v-if="reviewTask[reviewTask.length-1]">
          {{reviewTask[reviewTask.length-1].chinese}}
        </div>
        <div>
          <div class="el-icon-d-arrow-right"
            style="border-top-right-radius: 22.5px;border-bottom-right-radius: 22.5px;text-align:center;line-height:45px; width:45px;height:45px;font-size:35px;background-color:#67C23A;color:#FFF;"></div>
        </div>
      </div>
      <div v-else
        style="margin-top:35px;">
        <div style="border:1px solid #C0C0C0;display:flex;justify-content:center;">
          <div style="width:50px;height:30px;background-color:#C0C0C0;border-right:1px solid #C0C0C0;line-height: 30px;text-align:center;">1.</div>
          <div style="width:450px;height:30px;line-height: 30px;text-align:center;">认识</div>
        </div>
        <div style="margin-top:15px;border:1px solid #C0C0C0;display:flex;justify-content:center;">
          <div style="width:50px;height:30px;background-color:#C0C0C0;border-right:1px solid #C0C0C0;line-height: 30px;text-align:center;">2.</div>
          <div style="width:450px;height:30px;line-height: 30px;text-align:center;">不认识</div>
        </div>

      </div>

    </div>

  </div>
</template>
<script>
import { getReviewRecord, newReviewRecord } from "@/api/review-api.js"

export default {
  name: "Vocab",
  data () {
    return {
      reviewTask: [],
      translation_or_not: true
    }
  },
  computed: {
    // 计算属性的 getter

  },
  created: function () {
    this.getRreviewTask(this.$route.query.vocab_book_id)
    Window.Vue = this;
  },
  methods: {
    getRreviewTask: function (vocab_book_id) {
      let args = { vocab_book_id: vocab_book_id }
      getReviewRecord(args).then(response => {
        this.reviewTask = response.data.list
      })
    }
  }

}
</script>