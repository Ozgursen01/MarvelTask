<template>
    <header :class="{'navbar-fixed': fixedNavbar}">
      <nav class="navbar">
        <div class="logo">
          Netflix
        </div>
        <ul class="nav-links">
          <li class="nav-link"><router-link to="/">Ana Sayfa</router-link></li>
        </ul>
      </nav>
    </header>
  </template>
  
  <script>
  export default {
    name: 'AppNavbar',
    data() {
      return {
        fixedNavbar: false,
      };
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll);
    },
    beforeUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
      handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        this.fixedNavbar = scrollTop > 0;
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .navbar {
    background-color: black;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: top 0.8s ease;
  }
  
  .logo {
    font-size: 30px;
    font-weight: bold;
    color: red;
  }
  
  .nav-links {
    display: flex;
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  
  .nav-link {
    margin-left: 20px;
  }
  
  .nav-link a {
    color: white;
    text-decoration: none;
  }
  
  .nav-link a:hover {
    text-decoration: underline;
  }
  
  .navbar-fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
  }
  </style>
  