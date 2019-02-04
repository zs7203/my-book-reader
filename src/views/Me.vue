<template>
  <div>
    <van-nav-bar title="我的主页">
      <van-icon name="pending-evaluate" color="#4b0" slot="left" />
      <van-icon name="setting" color="#4b0" slot="right" />
    </van-nav-bar>
    <Card
      :title="title"
      desc="10月票 | 20推荐票"
      thumb="https://ss0.bdstatic.com/7Ls0a8Sm1A5BphGlnYG/sys/portrait/item/7cba7a7337323033f101"
    >
      <!-- <p slot="desc"></p> -->
      <!-- <p slot="tags">tags</p> -->
      <div slot="footer">
        <van-button type="primary" size="small">充值</van-button>
      </div>
    </Card>
    <br />
    <van-cell-group>
      <van-cell title="我的等级" icon="contact" is-link value="Lv1" />
      <van-cell title="我的阅历" icon="upgrade" is-link value="白丁" />
      <van-cell title="阅读偏好" icon="like-o" is-link />
      <van-cell title="粉丝称号" icon="idcard" is-link />
      <van-cell title="签到" icon="sign" is-link />
      <van-cell title="成为作家" icon="edit-data" is-link />
    </van-cell-group>
  </div>
</template>

<script>
import { Card } from "vant";

export default {
  data() {
    return {
      title: "oops`"
    };
  },
  components: {
    Card
  }
};
</script>
