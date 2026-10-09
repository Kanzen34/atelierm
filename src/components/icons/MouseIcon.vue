<script lang="ts" setup></script>

<template>
  <div class="Mouse">
    <div class="Mouse-wheel"></div>
  </div>
</template>

<style lang="scss" scoped>
.Mouse {
  position: relative;
  top: 10px;
  width: 20px;
  height: 30px;
  border: 2px solid var(--white);
  border-radius: 10px;
  animation: 2.5s linear 1s infinite alternate mouseAnimation;

  @media only screen and (min-width: 600px) {
    top: 40px;
  }
}

.Mouse-wheel {
  position: absolute;
  top: 6px;
  left: 50%;
  transform: translateX(-50%);
  width: 3px;
  height: 4px;
  border-radius: 4px;
  background-color: var(--white);
  animation: 2.5s linear 1s infinite alternate mouseWheelAnimation;
}

@keyframes mouseWheelAnimation {
  0% {
    top: 6px;
  }
  50% {
    top: 9px;
  }
  100% {
    top: 6px;
  }
}
@media only screen and (max-width: 600px) {
  @keyframes mouseAnimation {
    0% {
      top: -40px;
    }
    50% {
      top: -20px;
    }
    100% {
      top: -40px;
    }
  }
}

@keyframes mouseAnimation {
  0% {
    top: 10px;
  }
  50% {
    top: 0px;
  }
  100% {
    top: 0px;
  }
}
</style>
