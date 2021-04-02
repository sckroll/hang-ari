<template>
  <div>
    {{ $router.currentRoute.params.id }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      club: null,
    }
  },
  async mounted() {
    try {
      const clubId = this.$router.currentRoute.params.id
      const { data } = await this.$axios.get(`/api/club?clubId=${clubId}`)

      this.club = data[0]
      if (!this.club) throw new Error()
    } catch (e) {
      alert('존재하지 않는 동아리입니다.')
      this.$router.push('/club')
    }
  },
}
</script>

<style lang="scss" scoped></style>
