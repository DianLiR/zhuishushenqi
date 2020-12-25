<template>
  <div class="homepageHeader">
    <van-nav-bar left-arrow @click-left="$router.push({ name: 'Home' })">
      <template #left>
        <van-image
          height="18"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAToAAABIBAMAAACU8SQRAAAALVBMVEVHcEz////////////////////////////////////////////////////////NXt0CAAAADnRSTlMA4fGcFXjOJ7Q7WmlLh+5Ft9UAAAOBSURBVGje5ZpNaxNBGMfHJmnaWEPxIl5CDl68hIIHPZUIS/VUetBrqSAeQw5CPYUcRDwF8SaI5Oyh5C7I4lmkX0AwSV82L93PYLKZzO48u7M7MztP3OJz6TJMpj/+O/O8zRKytIYbtiPC2Q06PCYkx0+8IPH2fT6pTfStE0HXzgydGe344a6Ybs2bMFqnM89Jwfs73KID/WtAt3humnqzaekcAV22tUOh241Y1K0G6AjZ4OkI2bx+dBIWoBNZWjon03S42gH7T+iiTsXCtldI5+jTPaYDE2thT44DhqtdJ46u7CZZX3wqTn1v3EJ5s8l0Tqbpzs3QOTh0UxTtQAbV48a+yNOdZZqummm6Nsq+M0V3mmntuuHFbOqNY+gCR74Q6T8N0TVR6IBHEdCJ4ixbckAQ6eqadBuCghaJTjFHWRYt892sRidn6ejYfpxg0hFNutZyzkgxc19LPGaD9HQnyzl/EOnmTxUdukNYW2aKrgN7Grh0PbWqh22HA0S6vi4dW8vOIF2RrVVXrbb95o9nL2M8yoUmXSkUs5XobsGqRJMuOQugiEHXbsdVjHwz2Mu/8r5T65mnG9LlmpJ0ey6INDkXBkYmbCVd1UPLsijtBJGsyP7jwIbu031rnG4q0E5A95H98C7bxzWW89RN010qaRci4Ynv+3RDI3RVJe1Cb9F72+xgDLqG6Y5UtAufAM+e8s0FNqGWmm5HQbu8700eWpYV1bXaCdM981pfGlUP9Uay2u25CZn7Yjt6D1eMTrsmm9kHee02K8l07h1ZOmHvM7hmXV67H64E3cwNsh2oR5cDVZScdjddGbpZCElJtw76i9Jndl++uzjRpgvkaVdExd+1VkHX8unGJrRzjNL94gMZinbjJG8spPPj0aJolM7v9ldBtwsuJKXzOwW6qTZdgw9kqbVzjNIFfnWApd0oVK9I0hUD02ysfadNtwUCGYp2c2fg38e9tgIWX20XotqBpvfdpVw3LUyXgxdl0tqV1bTTolsHgUxeOwW6M126MghkKNrJ3TLF9T6X3U+gnfhrmbLCHaMu3QkIZFA7ZTqj2h2CQJZaO6N0HXiNh6FdX5euAQIZvBFI+kpL6jblXkeTDgYyFLrtUk2Lrii6xjNLR95o0ZVAmxeLjnz++u357weP3r96cbsm/2ZjPyK103+Vyt2FUMtbx59+Utp3M9p/RvcXlN2FjxlfktkAAAAASUVORK5CYII="
          width="75"
        />
      </template>
      <template #title>
        <van-button
          :class="{ active: sex == 'male' }"
          size="small"
          type="default"
          @click="$router.push('/?gender=male')"
        >男生</van-button
        >
        <van-button
          :class="{ active: sex == 'female' }"
          size="small"
          type="default"
          @click="$router.push('/?gender=female')"
        >女生</van-button
        >
      </template>
      <template #right>
        <font-awesome-icon
          :icon="['fas', 'swatchbook']"
          color="white"
          size="1x"
        />
        <font-awesome-icon :icon="['fas', 'user']" color="white" size="1x"/>
      </template>
    </van-nav-bar>
    <div class="home-search">
      <div class="search-box">
        <van-swipe
          :autoplay="2000"
          :loop="true"
          :show-indicators="false"
          :touchable="false"
          class="search-swiper"
          vertical
        >
          <van-swipe-item v-for="(item, index) in newHotWords" :key="index">{{
              item.word
                                                                            }}</van-swipe-item>
        </van-swipe>
        <font-awesome-icon
          :icon="['fas', 'search']"
          class="iconSearch"
          color="#9a9a9a"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['sex'],
  name: 'homepageHeader',
  data() {
    return {
      newHotWords: '',
    }
  },
  created() {
    this.axios({
      method: 'get',
      url: '/hot-books',
    }).then((response) => {
      this.newHotWords = response.data.newHotWords
    })
  },
}
</script>

<style lang="less" scoped>
.homepageHeader {
  .van-nav-bar {
    background-color: #b83320;

    /deep/ .van-nav-bar__right {
      width: 55px;
      justify-content: space-between;

      > .fa-1x {
        font-size: 1.5em;
      }
    }

    /deep/ .van-button {
      height: 28px;
      border-radius: 15px 0 0 15px;
      background-color: transparent;
      color: #fff;

      & + .van-button {
        margin-left: -1px;
        border-radius: 0 15px 15px 0;
      }

      &.active {
        background-color: #fff;
        color: #bdbabc;
      }
    }
  }

  .home-search {
    background-color: #fff;
    margin: 5px 0;

    .search-box {
      overflow: hidden;
      box-sizing: border-box;
      width: 90%;
      margin: auto;
      background-color: #e9e9e9;
      border-radius: 5px;
      display: flex;
      padding: 0 15px;
      align-items: center;

      .search-swiper {
        flex: 1;
        width: 100%;
        height: 34px;
        line-height: 34px;
        color: #ada5b4;
      }
    }
  }
}
</style>
