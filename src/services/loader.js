import Vue from 'vue'

export default new Vue({
  data () {
    return {
      loading: false
    }
  },
  methods: {
    start () {
      this.loading = true
    },
    stop () {
      this.loading = false
    }
  }
})
