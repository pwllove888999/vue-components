<template>
<div class="hello">
  <vue-pull-refresh :on-refresh="onRefresh">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
      <br>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
  </vue-pull-refresh>
  <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="5">
    <div v-for="(item, index) in data" class="">
      {{item.name}}<br><br><br><br><br><br><br><br>
    </div>
  </div>
</div>
</template>

<script>
import VuePullRefresh from 'vue-pull-refresh'
export default {
  name: 'hello',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      data: [],
      busy: false,
      count: 0
    }
  },
  components: {
    'vue-pull-refresh': VuePullRefresh
  },
  methods: {
    onRefresh: function() {
      return new Promise(function(resolve, reject) {
        setTimeout(function() {
          resolve()
        }, 1000)
      })
      .then(function() {
        console.log(123)
      })
    },
    loadMore: function() {
      console.log(333)
      this.busy = true
      setTimeout(() => {
        for (var i = 0, j = 20; i < j; i++) {
          this.data.push({ name: this.count++ })
        }
        this.busy = false
      }, 1000)
    }
  },
  // template: '<vue-pull-refresh :on-refresh="onRefresh"></vue-pull-refresh>',
  created() {
    this.$api.get('/users', {}, function(res) {
      console.log(res)
    }, function(res) {
      console.log(res)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
