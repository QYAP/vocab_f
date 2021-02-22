<template>
  <div style="display:flex;flex-direction:column;justify-content:center;align-items:center;">
    <div style="align-self:flex-end;display:flex;">
      <div style="display:flex;justify-content:space-around;align-items:center;width:60px;height:35px;margin:25px 15px; font-size: 15px;padding: 2px 10px;border-radius: 22px;background-color:#28bea0;color:#fff;"
        @click="dialogFormVisible = true">
        <span class="el-icon-plus" />
        <span>新词</span>
      </div>
      <el-dialog title="新单词"
        :visible.sync="dialogFormVisible"
        append-to-body>
        <el-form :model="form">
          <el-form-item label="词"
            :label-width="formLabelWidth">
            <el-input v-model="form.word"
              autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="翻译"
            :label-width="formLabelWidth">
            <el-input v-model="form.translation"
              autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer"
          class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary"
            @click="dialogFormVisible = false;NewVocabWord();">确 定</el-button>
        </div>
      </el-dialog>

      <div @click="returnVocabBook()"
        style="display:flex;justify-content:space-around;align-items:center;width:60px;height:35px;margin:25px 15px; font-size: 15px;padding: 2px 10px;border-radius: 22px;background-color:#28bea0;color:#fff;">
        <span class="el-icon-d-arrow-left" />
        <span>返回</span>
      </div>
    </div>
    <div>
      <el-table :data="tableData"
        style="width: 100%"
        max-height="650px">
        <el-table-column fixed
          prop="english"
          label="英语"
          width="150"
          align="center">
        </el-table-column>
        <el-table-column fixed
          prop="chinese"
          label="中文"
          width="500">
        </el-table-column>
        <el-table-column fixed="right"
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button @click.native.prevent="deleteRow(scope.$index, tableData)"
              type="text"
              size="small">
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="margin-top:30px;">
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
import { getVocabWordPageList, NewVocabWord, DelVocabWord } from "@/api/vocab-api.js"
export default {
  name: "vocab-detail",
  data () {
    return {
      page: 1,
      size: 10,
      pageNum: 1,
      tableData: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        word: '',
        translation: ''
      },
      formLabelWidth: '120px'
    }
  },
  created: function () {
    this.getPageList(this.$route.query.vocab_book_id, 1, this.size)

  },
  methods: {
    getPageList: function (vocab_book_id, page, size) {
      let req_args = { vocab_book_id: vocab_book_id, page: page, size: size }
      getVocabWordPageList(req_args).then(response => {
        this.tableData = response.data.list
        this.pageNum = Math.ceil(response.data.total_num / this.size)
      })
    },
    handleCurrentChange: function (page) {
      this.page = page
      this.getPageList(this.$route.query.vocab_book_id, this.page, this.size)
    },
    NewVocabWord: function () {
      let reqArgs = { "vocab_book_id": this.$route.query.vocab_book_id, "english": this.form.word, "chinese": this.form.translation }
      NewVocabWord(reqArgs).then(response => {
        this.getPageList(this.$route.query.vocab_book_id, 1, this.size)
      })
    },
    deleteRow (index, rows) {
      let reqArgs = { "vocab_book_id": this.$route.query.vocab_book_id, "vocab_word_id": rows[index].vocab_word_id }
      DelVocabWord(reqArgs)
      this.getPageList(this.$route.query.vocab_book_id, this.page, this.size)
      // rows.splice(index, 1)
    },
    returnVocabBook: function () {
      this.$router.push({ path: "/Vocab" })
    }
  }
}
</script>