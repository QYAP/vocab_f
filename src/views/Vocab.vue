<template>
  <div style="display:flex;flex-direction:column;justify-content:center;align-items:center;">
    <div @click="dialogFormVisible = true"
      style="align-self:flex-end;display:flex;justify-content:space-around;align-items:center;width:80px;height:35px;margin:25px 15px; font-size: 15px;padding: 2px 10px;border-radius: 22px;background-color:#28bea0;color:#fff;">
      <img :src="imgSrc"
        style="width:25px;height:25px;" />
      <span>新词本</span>
    </div>
    <el-dialog title="新词本"
      :visible.sync="dialogFormVisible"
      width="600px"
      append-to-body>
      <el-form :model="form">
        <el-form-item label="生词本名称"
          :label-width="formLabelWidth">
          <el-input v-model="form.vocabBookName"
            autocomplete="off" />
        </el-form-item>
        <el-form-item label="任务量（词/日）"
          :label-width="formLabelWidth">
          <el-input v-model="form.dailyPlanPassWord"
            autocomplete="off" />
        </el-form-item>
        <el-form-item label="是否提醒"
          :label-width="formLabelWidth">

          <el-switch v-model="form.remindOrNot"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer"
        class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary"
          @click="dialogFormVisible = false;newVocabBook();">确 定</el-button>
      </div>
    </el-dialog>
    <div class="vocab-book-box-list"
      style="width:100%;display:flex;margin:15px;flex-wrap:wrap;justify-content:flex-start;">
      <div @click="goReview(bookItem.vocab_book_id)"
        v-for="bookItem in bookViewDataList"
        class="vocab-book-box"
        style="display:flex;width:420px;height:250px;margin:10px 10px;justify-content:center;align-items:center;">
        <img class="vocab-book-cover"
          style="width: 150px;height: 220px;border-radius: 20px;"
          src="https://media-image1.baydn.com/wordmaster_pub_image/verskb/bc81a3775e7abc63f77aa44dec9c3640.7984221faac22c458c81c123e4b0569c.jpeg" />
        <div class="vocab-book-info-box"
          style="display: flex;height: 220px;flex-basis:100%;margin-left: 10px;flex-direction: column;justify-content: flex-start;">
          <div class="vocab-book-description">
            <div style="display:flex;justify-content:space-between;align-items: center;">
              <div class="vocab-book-name"
                style="font-size: 20px;color: #333;font-weight: 700;">{{bookItem.vocab_book_name}}</div>
              <div @click.stop
                @click="goVocabDetail(bookItem.vocab_book_id)"
                style="display:flex;justify-content:space-between;align-items:center;width:65px;height:25px;padding:3px 10px;border-top-left-radius:22.5px;border-bottom-left-radius:22.5px;background-color:#28bea0;color:#fff;font-size:16px;text-align:center;">
                <span class="el-icon-notebook-2"
                  style="padding-top:3px;"></span>
                <span style="margin-left:3px;">词表></span>
              </div>
            </div>
            <div style="margin-top:5px;display:flex;justify-content:flex-end;align-items: center;">
              <div style="display:flex;justify-content:space-between;align-items:center;height:15px;width:50px;line-height:15px;padding:5px 5px;border-top-left-radius:22.5px;border-bottom-left-radius:22.5px;background-color:#ff0000;color:#fff;font-size:16px;text-align:center;">
                <span class="el-icon-delete"></span>
                <span style="margin-left:1px;"
                  @click.stop
                  @click="delVocabBook(bookItem.vocab_book_id)">删除</span>
              </div>
            </div>
            <div style="display:flex;align-items:center;margin-top:30px;">
              <span style="background-color: #28bea0;color: #fff;border-radius: 4px;padding: 2px 5px;font-size: 16px;">任务量</span>
              <span style="margin-left:5px;">{{bookItem.daily_plan_pass_word}}词/日</span>
            </div>
            <div style="display:flex;align-items:center;margin-top:3px;">
              <span style="background-color: #28bea0;color: #fff;border-radius: 4px;padding: 2px 5px;font-size: 16px;">提醒时间</span>
              <span style="margin-left:5px;">{{bookItem.daily_remind_time}}</span>
            </div>
            <div style="display:flex;align-items:center;margin-top:3px;">
              <span style="background-color: #28bea0;color: #fff;border-radius: 4px;padding: 2px 5px;font-size: 16px;">预计完成时间</span>
              <span style="margin-left:5px;">{{bookItem.plan_finish_date}}</span>
            </div>
          </div>
          <div class="vocab-book-progress"
            style="display:flex;margin-bottom:10px;flex-direction:column;justify-content:flex-end;flex-basis:100%;">
            <div style="display:flex;width:100%;flex-wrap:nowrap; justify-content: space-between;">
              <div>{{bookItem.learnedPercent}}%</div>
              <div>{{bookItem.learned_word_num}}/{{bookItem.total_word_num}}词</div>
            </div>
            <div class="vocab-book-progress-bar"
              style="display:flex;width:100%;height:5px;margin-top:5px;flex-wrap:nowrap;">
              <div :style="{'flex-grow': bookItem.processBar, 'background-color': 'rgb(32, 158, 133)', 'color': 'rgb(255, 255, 255)'}"></div>
              <div :style="{'flex-grow': 1-bookItem.processBar, 'background-color': 'rgb(245, 245, 245)', 'color': 'rgb(68, 68, 68)'}"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <el-pagination background
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :current-page="page"
        :total="pageNum">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { getVocabBookPageList, NewVocabBook, DelVocabBook } from "@/api/vocab-api.js"
export default {
  name: "Vocab",
  data () {
    return {
      imgSrc: require("@/assets/new-book.png"),
      page: 1,
      size: 10,
      pageNum: 1,
      bookList: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        userId: this.$session.get("userInfo").user_id,
        dailyPlanPassWord: 0,
        remindOrNot: false,
        vocabBookName: '',
        position: 0,
        desc: "",
        cover: ""
      },
      formLabelWidth: '120px'
    }
  },
  computed: {
    // 计算属性的 getter
    bookViewDataList: function () {
      // `this` 指向 vm 实例
      this.bookList.forEach(element => {
        element.processBar = (element.learned_word_num / element.total_word_num).toFixed(2);
        element.learnedPercent = element.processBar * 100;
      });
      return this.bookList
    }
  },
  created: function () {
    this.getPageList(this.$session.get("userInfo").user_id, this.page, this.size)
  },
  methods: {
    handleCurrentChange: function (page) {
      this.page = page;
      this.getPageList(this.$session.get("userInfo").user_id, this.page, this.size)
    },
    getPageList: function (user_id, page, size) {
      let req_args = { user_id: user_id, page: page, size: size }
      getVocabBookPageList(req_args).then(response => {
        this.bookList = response.data.list
        this.pageNum = Math.ceil(response.data.total_num / this.size)
      })
    },
    delVocabBook: function (vocab_book_id) {
      let reqArgs = {
        user_id: this.$session.get("userInfo").user_id,
        vocab_book_id: vocab_book_id
      }
      DelVocabBook(reqArgs).then(response => {
        this.getPageList(this.$session.get("userInfo").user_id, this.page, this.size)
      })
    },
    newVocabBook: function () {
      this.form.user_id = this.form.userId
      this.form.vocab_book_name = this.form.vocabBookName
      this.form.remind_or_not = this.form.remindOrNot
      this.form.daily_plan_pass_word = this.form.dailyPlanPassWord
      NewVocabBook(this.form).then(response => {
        this.getPageList(this.$session.get("userInfo").user_id, 1, this.size)
      })
    },
    goVocabDetail: function (vocab_book_id) {
      this.$router.push({ path: "/VocabDetail", query: { "user_id": this.$session.get("userInfo").user_id, "vocab_book_id": vocab_book_id } });
    },
    goReview: function (vocab_book_id) {
      this.$router.push({ path: "/Review", query: { "user_id": this.$session.get("userInfo").user_id, "vocab_book_id": vocab_book_id } });
    }
  }
}
</script>

<style>
.vocab-book-description div {
  display: flex;
  text-align: left;
}
/* .vocab-book-box-list:after {
  content: "";
  flex: 1;
} */
</style>