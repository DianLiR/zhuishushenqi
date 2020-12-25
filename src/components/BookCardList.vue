<template>
  <div class="book_card_list">
    <span>{{title}}</span>
    <book-card
      v-for="item in booklist.books.slice(0, 4)"
      :key="item._id"
      :item="item"
    />
  </div>
</template>

<script>
import BookCard from '@/components/BookCard'

export default {
  name: 'BookCardList',
  components: { BookCard },
  props: ['booklist','title'],
}
</script>

<style lang="less" scoped>
.book_card_list {
  background-color: #fff;
  padding: 10px 0;

  span {
    font-weight: 700;
    border-left: 2px red solid;
    padding-left: 10px;
  }
}
</style>
