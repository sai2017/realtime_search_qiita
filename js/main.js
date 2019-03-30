var app = new Vue({
    el: '#app',
    data: {
      // APIから取得した検索結果を格納
      items: null,
      // ユーザーが入力した検索キーワード
      keyword: '',
      // ユーザーに表示するメッセージ
      message: ''
    },
    watch: {
      keyword: function(newKeyword, oldKeyword) {
        // キーボードで検索中の間のメッセージ
        this.message = '少々お待ち下さい'
        this.debouncedGetAnswer()
      }
    },
    created: function() {
      // 以下デバッグ用
      // 検索初期値として「JavaScript」にしてみる
      // this.keyword = 'JavaScript'
      // getAnswerメソッド呼び出し
      // this.getAnswer()

      this.debouncedGetAnswer = _.debounce(this.getAnswer, 1000)
    },
    methods: {
      getAnswer: function() {
        if(this.keyword === '') {
          this.items = null
          this.message = '調べたいキーワードを入力してください'
          return
        }
        // ローディングメッセージ
        this.message = 'Qiitaの記事、一生懸命検索中m(_ _)m'
        // thisはVueインスタンスを指している
        var vm = this
        // パラメータ
        var params = { page: 1, per_page: 20, query: this.keyword }
        axios.get('https://qiita.com/api/v2/items', { params })
          .then(function(response) {
            console.log(response)
            // itemsプロパティにAPIデータを格納
            vm.items = response.data
          })
          .catch(function(error) {
            vm.message = 'Error!' + error
          })
          .finally(function() {
            vm.message = ''
          })
      }
    }
})