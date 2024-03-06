<template>
   <img class="logo" src="./assets/logo_proxiad.png" />
  <router-view />
</template>

<script>
export default {
  name: 'App', 
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
.logo{
  width:200px;
}
.register input, .login input {
  width: 300px;
  height: 40px;
  padding-left: 20px;
  display: block;
  margin-bottom: 30px;
  margin-right: auto;
  margin-left: auto;
  border: 1px solid skyblue;
}
.register button, .login button {
  width: 320px;
  height: 40px;
  padding-left: 20px;
  border: 1px solid skyblue;
  background: skyblue;
  color: #fff;
  cursor: pointer;
}
.example {
  margin: 20px;
}

.example input {
  display: none;
}

.example label {
  margin-right: 20px;
  display: inline-block;
  cursor: pointer;
}

.ex1 span {
  display: block;
  padding: 5px 10px 5px 25px;
  border: 2px solid #ddd;
  border-radius: 5px;
  position: relative;
  transition: all 0.25s linear;
}

.ex1 span:before {
  content: '';
  position: absolute;
  left: 5px;
  top: 50%;
  -webkit-transform: translatey(-50%);
  transform: translatey(-50%);
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #ddd;
  transition: all 0.25s linear;
}

.ex1 input:checked+span {
  background-color: #fff;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1);
}

.ex1 .red input:checked+span {
  color: red;
  border-color: red;
}

.ex1 .red input:checked+span:before {
  background-color: red;
}

.ex1 .blue input:checked+span {
  color: blue;
  border-color: blue;
}

.ex1 .blue input:checked+span:before {
  background-color: blue;
}
</style>
