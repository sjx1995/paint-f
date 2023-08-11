<!--
 * @Description: Footer
 * @Author: Sunly
 * @Date: 2023-08-11 16:24:31
-->
<script lang="ts" setup>
import Logo from "@/assets/PaintF-logo.png";
</script>

<template>
  <div class="footer-wrapper">
    <img :src="Logo" alt="paint-f-logo" />
    <div>
      <p id="project-name">Paint-F</p>
      <p>
        <a href="https://github.com/sjx1995/paint-f/" target="_blank">
          查看 Github 仓库
        </a>
      </p>
      <p>Sunly © 2023</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.footer-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  img {
    width: 80px;
    height: 80px;
    margin-right: 8px;
  }
  div {
    color: #1f1f1f;
    font-size: 14px;
    p {
      margin: 2px 0;
    }
    #project-name {
      font-size: 22px;
      font-weight: bold;
    }
    a {
      color: inherit;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
