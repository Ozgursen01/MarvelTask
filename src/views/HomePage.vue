<template>
  <div class="body">
    <div class="background-image" style="background-image: url('https://wallpaperaccess.com/full/14358.jpg');">
      <div class="overlay">
        <h1 class="main-title">MARVEL COMICS</h1>
      </div>
    </div>

    <h2 class="sub-title">
      Western Çizgi Romanları
      <span class="favorite-count">Favoriler: {{ favoriteCount }}</span>
    </h2>
    <div v-if="isLoading" class="loading-message">Loading comics...</div>
    <div v-if="!isLoading" class="comics-list-container">
      <div class="scroll-button left" @click="scrollLeft">&#8249;</div>
      <div class="scroll-button right" @click="scrollRight">&#8250;</div>
      <div class="comics-list" ref="comicsList">
        <div class="grid-container">
          <div v-for="comic in comics" :key="comic.id" class="comic-card">
            <div class="comic-image">
              <img :src="getThumbnailURL(comic.thumbnail)" alt="Thumbnail" class="image"
                @click="navigateToFav(comic.id)" />
              <div class="comic-overlay">
                <div class="comic-favorite" @click="toggleFavorite(comic)">
                  <i class="fas fa-heart" :class="{ 'favorite': isFavorite(comic) }"></i>
                </div>
              </div>
            </div>
            <div class="comic-details">
              <div class="comic-details-header">
                <h2 class="comic-title">{{ comic.title }}</h2>
                <div class="comic-rating">
                  <i class="fas fa-star"></i>
                  <span class="rating">{{ comic.rating }}</span>
                </div>
              </div>
              <div class="comic-description">{{ comic.description }}</div>
              <ul class="comic-creators">
                <li v-for="creator in comic.creators.items" :key="creator.name">
                  <span class="creator-role">{{ creator.role }}</span>
                  <span class="creator-name">{{ creator.name }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>



    <h2 class="sub-title">
      Komedi-Mizah Çizgi Romanları
      <span class="favorite-count">Favoriler: {{ favoriteCount }}</span>
    </h2>
    <div v-if="!isLoading" class="comics-list-container">
      <div class="scroll-button left" @click="scrollLeft2">&#8249;</div>
      <div class="scroll-button right" @click="scrollRight2">&#8250;</div>
      <div class="comics-list" ref="comicsList2">
        <div class="grid-container">
          <div v-for="comic in comics" :key="comic.id" class="comic-card">
            <div class="comic-image">
              <img :src="getThumbnailURL(comic.thumbnail)" alt="Thumbnail" class="image"
                @click="navigateToFav(comic.id)" />
              <div class="comic-overlay">
                <div class="comic-favorite" @click="toggleFavorite(comic)">
                  <i class="fas fa-heart" :class="{ 'favorite': isFavorite(comic) }"></i>
                </div>
              </div>
            </div>
            <div class="comic-details">
              <div class="comic-details-header">
                <h2 class="comic-title">{{ comic.title }}</h2>
                <div class="comic-rating">
                  <i class="fas fa-star"></i>
                  <span class="rating">{{ comic.rating }}</span>
                </div>
              </div>
              <div class="comic-description">{{ comic.description }}</div>
              <ul class="comic-creators">
                <li v-for="creator in comic.creators.items" :key="creator.name">
                  <span class="creator-role">{{ creator.role }}</span>
                  <span class="creator-name">{{ creator.name }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <h2 class="sub-title">
      Siyasi Çizgi Romanları
      <span class="favorite-count">Favoriler: {{ favoriteCount }}</span>
    </h2>
    <div v-if="!isLoading" class="comics-list-container">
      <div class="scroll-button left" @click="scrollLeft3">&#8249;</div>
      <div class="scroll-button right" @click="scrollRight3">&#8250;</div>
      <div class="comics-list" ref="comicsList3">
        <div class="grid-container">
          <div v-for="comic in comics" :key="comic.id" class="comic-card">
            <div class="comic-image">
              <img :src="getThumbnailURL(comic.thumbnail)" alt="Thumbnail" class="image"
                @click="navigateToFav(comic.id)" />
              <div class="comic-overlay">
                <div class="comic-favorite" @click="toggleFavorite(comic)">
                  <i class="fas fa-heart" :class="{ 'favorite': isFavorite(comic) }"></i>
                </div>
              </div>
            </div>
            <div class="comic-details">
              <div class="comic-details-header">
                <h2 class="comic-title">{{ comic.title }}</h2>
                <div class="comic-rating">
                  <i class="fas fa-star"></i>
                  <span class="rating">{{ comic.rating }}</span>
                </div>
              </div>
              <div class="comic-description">{{ comic.description }}</div>
              <ul class="comic-creators">
                <li v-for="creator in comic.creators.items" :key="creator.name">
                  <span class="creator-role">{{ creator.role }}</span>
                  <span class="creator-name">{{ creator.name }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  computed: {
    ...mapState(['comics', 'favorites']),
    isLoading() {
      return this.comics.length === 0;
    },
    isLoadingSciFi() {
      return this.sciFiComics.length === 0;
    },
    sciFiComics() {
      // Burada Bilim Kurgu çizgi romanlarını filtreleyebilirsiniz
      // Örneğin:
      // return this.comics.filter(comic => comic.genre === 'Sci-Fi');
      return this.comics;
    },
    favoriteCount() {
      let count = 0;
      for (const comic of this.comics) {
        if (this.isFavorite(comic)) {
          count++;
        }
      }
      return count;
    },
  },
  mounted() {
    this.fetchComics();
  },
  methods: {
    ...mapActions(['fetchComics', 'toggleFavorite']),
    getThumbnailURL(thumbnail) {
      return `${thumbnail.path}.${thumbnail.extension}`;
    },
    navigateToFav(comicId) {
      this.$router.push({ name: 'FavPage', params: { id: comicId.toString() } });
    },
    scrollLeft() {
      const listContainer = this.$refs.comicsList;
      if (!listContainer) return;
      listContainer.scrollBy({
        left: -200,
        behavior: 'smooth',
      });
    },
    scrollRight() {
      const listContainer = this.$refs.comicsList;
      if (!listContainer) return;
      listContainer.scrollBy({
        left: 200,
        behavior: 'smooth',
      });
    },
    scrollLeft2() {
      const listContainer2 = this.$refs.comicsList2;
      if (!listContainer2) return;
      listContainer2.scrollBy({
        left: -200,
        behavior: 'smooth',
      });
    },
    scrollRight2() {
      const listContainer2 = this.$refs.comicsList2;
      if (!listContainer2) return;
      listContainer2.scrollBy({
        left: 200,
        behavior: 'smooth',
      });
    },
    scrollLeft3() {
      const listContainer3 = this.$refs.comicsList3;
      if (!listContainer3) return;
      listContainer3.scrollBy({
        left: -200,
        behavior: 'smooth',
      });
    },
    scrollRight3() {
      const listContainer3 = this.$refs.comicsList3;
      if (!listContainer3) return;
      listContainer3.scrollBy({
        left: 200,
        behavior: 'smooth',
      });
    },

    isFavorite(comic) {
      return this.favorites && this.favorites.includes(comic.id);
    },
  },
};
</script>

<style lang="scss">
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  /* Arka plana bir overlay ekler */
  display: flex;
  align-items: center;
  justify-content: center;
}

.body {
  background-color: black;
  margin: 0;
  padding: 0;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}

.main-title {
  color: transparent;
  font-size: 48px;
  text-align: center;
  background: linear-gradient(to right, #ff0000, #ff5c5c);
  background-clip: text;
  -webkit-background-clip: text;
  animation: none;
  transition: all 0.3s;
}

.main-title:hover {
  background: linear-gradient(to right, #ff0000, #0000ff);
  background-clip: text;
  -webkit-background-clip: text;
  animation: glowing 2s linear infinite;
}

@keyframes glowing {
  0% {
    text-shadow: 0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000;
  }

  50% {
    text-shadow: 0 0 10px #0000ff, 0 0 20px #0000ff, 0 0 30px #0000ff;
  }

  100% {
    text-shadow: 0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000;
  }
}

.background-image {
  background-image: url('https://wallpaperaccess.com/full/14358.jpg');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  position: relative;
  height: 90vh;
  /* Sayfa yüksekliği kadar arka plan görüntüsü alır */
}

.sub-title {
  text-align: left;
  margin-left: 25px;
  color: white;
}

.loading-message {
  margin: 20px;
  font-size: 18px;
  text-align: center;
}

.comics-list-container {
  position: relative;
  overflow: hidden;
}

.scroll-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: #ccc;
  border-radius: 50%;
  font-size: 24px;
  color: #fff;
  cursor: pointer;
  z-index: 1;
}

.background-image {
  background-repeat: no-repeat;
  background-position: center center;
  height: 300px;
  background-size: cover;
}

.scroll-button:hover {
  background-color: #aaa;
}

.scroll-button.left {
  left: 10px;
}

.scroll-button.right {
  right: 10px;
}

.comics-list {
  height: 80vh;
  display: flex;
  overflow-x: hidden;
  scroll-snap-type: x mandatory;
  padding: 20px 0;
  background-color: #222;
}

.grid-container {
  display: grid;
  grid-auto-flow: column;
  grid-gap: 20px;
  padding: 0 20px;
  scroll-snap-align: start;
}


.comic-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 300px;
  width: 250px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  position: relative;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  /* Yeni satır */
}

.comic-card:hover .image {
  transform: scale(1.1);
}

.comic-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.3s;
}

.comic-image:hover .comic-overlay {
  opacity: 1;
}

.comic-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.comic-details {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 10px;
  color: #ffffff;
}

.comic-details-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.comic-title {
  font-size: 20px;
  margin-bottom: 5px;
  color: #ffffff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.comic-rating {
  display: flex;
  align-items: center;
  color: #ffd700;
  /* Altın rengi */
}

.comic-rating .fas.fa-star {
  margin-right: 5px;
}

.rating {
  font-size: 16px;
}


.comic-description {
  margin-bottom: 10px;
  color: #ffffff;
  font-size: 14px;
  line-height: 1.4;
}

.comic-creators {
  list-style-type: none;
  padding: 0;
  margin: 0;
}


.comic-creators li {
  font-size: 14px;
  color: #ffffff;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.creator-role {
  margin-right: 5px;
  color: #ffd700;
  font-weight: bold;
}

.creator-name {
  font-weight: normal;
}

.comic-favorite {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  color: #ccc;
  cursor: pointer;
  transition: transform 0.3s, color 0.3s;
}

.comic-image:hover .comic-favorite {
  color: rgb(141, 84, 84);
  transform: scale(1.2) rotate(45deg);
}

.favorite {
  color: red;
}
</style>
