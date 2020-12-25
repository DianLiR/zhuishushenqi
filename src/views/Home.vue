<template>
  <div class="Home">
    <homepage-header :sex="gender"/>

    <van-swipe
        :autoplay="3000"
        :loop="true"
        :show-indicators="false"
        class="home-swipe"
    >
      <van-swipe-item
          v-for="(item, index) in gender == 'male' ? banner_male : banner_female"
          :key="index"
      >
        <van-image :src="item.img" width="100%"/>
      </van-swipe-item>
    </van-swipe>

    <van-grid :column-num="3" class="mt_lg">
      <van-grid-item
          v-for="(item, index) in navData"
          :key="index"
          :to="item.link"
      >
        <font-awesome-icon :icon="['fas', item.icon]" size="lg"/>
        <span>{{ item.text }}</span>
      </van-grid-item>
    </van-grid>
    <book-card-list
        v-if="maleHot"
        :booklist="maleHot"
        :title="gender == 'male' ? '男生热门' : '女生热门'"
    ></book-card-list>
    <book-card-list
        v-if="maleFinish"
        :booklist="maleFinish"
        :title="gender == 'male' ? '男生完榜' : '女生完榜'"
    ></book-card-list>
  </div>
</template>

<script>
import HomepageHeader from '@/components/homePageHeader'
import BookCardList from '@/components/BookCardList'

export default {
  components: { BookCardList, HomepageHeader },
  name: 'Home',

  data() {
    return {
      gender: 'male',
      banner_male: [],
      banner_female: [],
      navData: [
        {
          icon: 'list',
          text: '分类',
          link: '/category',
        },
        {
          icon: 'award',
          text: '排行',
          link: '/ranking',
        },
        {
          icon: 'book',
          text: '书单',
        },
      ],
      maleHot: '',
      maleFinish: '',
    }
  },
  watch: {
    gender(n) {
      console.log(n)
      if (n == 'male') {
        this.getHotData(true)
      } else {
        this.getHotData(false)
      }
    },
  },
  methods: {
    getbanner() {
      this.axios({
        method: 'get',
        url: 'http://img.zzyyl.xyz/banner_img.json',
      }).then((res) => {
        this.banner_male = res.data.male
        this.banner_female = res.data.female
      })
    },
    getHotData() {
      let url
      if (this.gender == 'female') {
        url = '/rank/54d43437d47d13ff21cad58b'
      } else {
        url = '/rank/54d42d92321052167dfb75e3'
      }
      //获取热门
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        overlay: true,
      })
      this.axios({
        method: 'get',
        url,
      }).then((res) => {
        this.$toast.clear()
        console.log(res)
        this.maleHot = res.data.ranking
      })
    },
    getFinishData() {
      //获取完结榜
      let url
      if (this.gender == 'female') {
        url = '/rank/564eb878efe5b8e745508fde'
      } else {
        url = '/rank/564eb8a9cf77e9b25056162d'
      }
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        overlay: true,
      })
      this.axios({
        method: 'get',
        url,
      }).then((res) => {
        this.$toast.clear()
        console.log(res)
        this.maleFinish = res.data.ranking
      })
    },
  },
  created() {
    this.getbanner()
    this.getHotData()
    this.getFinishData()
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.gender = to.query.gender || 'male'
    })
  },
  //切换路由修改 值
  beforeRouteUpdate(to, from, next) {
    this.gender = to.query.gender || 'male'
    next()
  },
}
</script>

<style lang="less" scoped>
.Home {
  .mt_lg {
    margin-bottom: 15px;
  }

  .home-swipe {
    background-color: #eeeeee;

    /deep/ .van-image {
      vertical-align: middle;
    }
  }
}
</style>
