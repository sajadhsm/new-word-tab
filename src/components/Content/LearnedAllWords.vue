<template>
  <div class="learned-all">
    <span class="learned-all__emoji">🎉</span>
    <h1 class="learned-all__title">Hooray</h1>
    <p class="learned-all__subtitle">
      You've learned all of our words. Well done!
    </p>
  </div>
</template>

<style>
.learned-all {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  padding: 0 15px;
  text-align: center;
  font-size: 1rem;
}

.learned-all__emoji {
  font-size: 5rem;
}

.learned-all__title {
  margin: 10px 0;
  font-size: 3rem;
}

.learned-all__subtitle {
  margin: 0;
  font-size: 1.25rem;
}
</style>
