<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  created() {
    //获取排名分类
    this.axios({
      method: 'get',
      url: '/rank-category',
    }).then((res) => {
      this.$store.commit('updateRankCategory', res.data)
    })
  },
}
</script>
<style>
#app{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  background-color: #f4f4f4;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  }
</style>
