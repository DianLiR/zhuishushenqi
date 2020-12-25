<template>
  <div class="ranking">
    <van-tabs v-model="type" @click="onClickVanTab">
      <van-tab
        v-for="(item, index) in tabListDate"
        :key="index"
        :name="item.name"
        :title="item.title"
      >
        <van-sidebar v-model="activeKey">
          <van-sidebar-item
            v-for="(item, index) in rankCategory[type]"
            :key="index"
            :title="item.shortTitle"
          />
        </van-sidebar>

        <van-list
          v-model="loading"
          :finished="finished"
          class="right_list"
          finished-text="没有更多了"
        >
          <book-card
            v-for="(item, index) in ranking.books"
            :key="index"
            :item="item"
          ></book-card>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { mapState } from "vuex";
import BookCard from "../components/BookCard";

export default {
  name: "Ranking",
  components: { BookCard },
  data() {
    return {
      type: "epub",
      ranking: null,
      activeKey: 0,
      loading: true,
      finished: true,
      tabListDate: [
        {
          title: "出版",
          name: "epub",
        },
        {
          title: "男生",
          name: "male",
        },
        {
          title: "女生",
          name: "female",
        },
      ],
    };
  },
  computed: {
    ...mapState(["rankCategory"]),
  },
  created() {
    this.getList();
  },
  watch: {
    type() {
      this.activeKey = 0;
      this.getList();
    },
    activeKey() {
      this.getList();
    },
  },
  methods: {
    onClickVanTab(name) {
      this.$router.push("/ranking?type=" + name);
    },

    getList() {
      let id = this.rankCategory[this.type][this.activeKey]._id;
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        // overlay: true,
      });
      this.axios({
        url: "/rank/" + id,
      }).then((res) => {
        this.$toast.clear();
        this.ranking = res.data.ranking;
      });
    },
  },
  beforeRouteEnter(t, f, n) {
    n((vm) => {
      vm.type = t.query.type || "epub";
    });
  },
  beforeRouteUpdate(t, f, n) {
    this.type = t.query.type || "epub";
    n();
  },
};
</script>

<style lang="less" scoped>
.ranking {
  .van-tab__pane,
  .van-tab__pane-wrapper {
    display: flex;

    .van-sidebar {
      height: calc(100vh - 44px);
      overflow-y: scroll;

      .van-sidebar-item {
        padding: 14px 12px;
      }
    }
  }

  /deep/ .right_list {
    flex: 1;
    height: calc(100vh - 44px);
    overflow-y: scroll;
  }
}
</style>
