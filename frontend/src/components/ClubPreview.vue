<template>
  <article class="club-preview">
    <router-link :to="club.to">
      <div class="club-thumbnail-container">
        <img :src="club.thumbnail" :alt="club.name" class="club-thumbnail" />
        <div class="club-info">
          <h2 class="club-title">{{ club.name }}</h2>
          <p class="club-description">{{ club.description }}</p>
        </div>
      </div>
    </router-link>
  </article>
</template>

<script>
export default {
  name: 'ClubPreview',
  props: {
    club: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.club-preview {
  width: $preview-width;
  height: $preview-width;
  border-radius: $box-radius;
  box-shadow: 0 0 8px #66666666;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 0 24px #66666699;
  }

  & a {
    text-decoration: none;
  }
  & .club-thumbnail-container {
    height: $preview-width;
  }
  & .club-thumbnail {
    width: $preview-width;
    height: 160px;
    object-fit: cover;
    border-top-left-radius: $box-radius;
    border-top-right-radius: $box-radius;
  }
  & .club-info {
    border-bottom-left-radius: $box-radius;
    border-bottom-right-radius: $box-radius;
    padding: 8px 16px;
    color: #000000;
  }
  & .club-title {
    margin: 0;
    font-size: 18px;
  }
  & .club-description {
    margin: 0;
    font-size: 14px;
  }
}
</style>
