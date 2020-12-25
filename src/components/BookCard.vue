<template>
  <div class="book_card">
    <van-card
      :desc="item.shortIntro"
      :lazy-load="true"
      :price="213"
      :thumb="`http://statics.zhuishushenqi.com${item.cover}`"
      :title="item.title"
    >
      <template #desc>
        <div class="van-multi-ellipsis--l2">{{ item.shortIntro }}</div>
      </template>
      <template #price>
        <div class="card-info">
          <font-awesome-icon color="#969ba3" icon="user"/>
          <span>{{ item.author }}</span>
        </div>
      </template>
      <template #num>
        <div class="book_tag">
          <van-tag plain size="mini">{{ item.majorCate }}</van-tag>
          <van-tag plain size="mini" type="primary">{{ item.retentionRatio }}%留存</van-tag>
        </div>
      </template>
    </van-card>
  </div>
</template>

<script>
export default {
  name: 'BookCard',
  props: ['item'],
}
</script>

<style lang="less" scoped>
.book_card {
  background-color: white;

  /deep/ .van-card {
    background-color: white;
  }

  /deep/ .van-card__thumb {
    height: 90px;
    width: 75px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);

    img {
      border-radius: 0;
    }
  }

  .van-card__title {
    font-size: 16px;
    font-weight: 700;
  }

  .card-info {
    display: flex;
    align-items: center;

    > span {
      margin-left: 2px;
      color: #969ba3;
    }
  }
  .book_tag>span{
    margin: 0 2px;
  }
}
</style>
