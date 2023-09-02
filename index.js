'use strict';

import './style.css';

const themeToggleButton = document.querySelector('#theme-toggle-button');
const lightModeIcon = document.querySelector('#light-mode-icon');
const darkModeIcon = document.querySelector('#dark-mode-icon');

const userTheme = localStorage.getItem('theme');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

const themeCheck = () => {
    if(userTheme === 'dark' || (!userTheme && systemTheme)){
        document.documentElement.classList.add('dark');
        lightModeIcon.style.display = 'inline-block';
        darkModeIcon.style.display = 'none';
    }else{
        document.documentElement.classList.remove('dark');
        darkModeIcon.style.display = 'inline-block';
        lightModeIcon.style.display = 'none';
    }
};

const themeSwitch = () => {
    if(document.documentElement.classList.contains('dark')){
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        darkModeIcon.style.display = 'inline-block';
        lightModeIcon.style.display = 'none';
    }else{
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        lightModeIcon.style.display = 'inline-block';
        darkModeIcon.style.display = 'none';
    }
};

themeToggleButton.addEventListener('click', themeSwitch);
themeCheck();

const getElement = elementName => document.querySelector(`#${elementName}`);

const searchForm = getElement('search-form');
const searchInput = getElement('search-input');
const counterSection = getElement('counter-section');
const reposCount = getElement('repos-count');
const followersCount = getElement('followers-count');
const followingCount = getElement('following-count');
const gistsCount = getElement('gists-count');
const mainSection = getElement('main-section');
const avatar = getElement('avatar');
const name = getElement('name');
const userName = getElement('username');
const date = getElement('date');
const followButton = getElement('follow-button');
const bio = getElement('bio');
const location = getElement('location');
const locationContainer = getElement('location-container');
const company = getElement('company');
const companyContainer = getElement('company-container'); 
const blog = getElement('blog');
const twitter = getElement('twitter');
const userNotFoundSection = getElement('user-not-found-section');
const loaderSection = getElement('loader-section');
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const addElement = (element) => {
    if(element.classList.contains('inactive')){
        element.classList.remove('inactive');
    }
};

const removeElement = (element) => {
    if(!element.classList.contains('inactive')){
        element.classList.add('inactive');
    }
};

const renderTheData = (data) => {
    const checkNull = (value, element) => {
        if(value === '' || value === null){
            removeElement(element);
            return true;
        }else{
            addElement(element);
            return false;
        }
    };
    reposCount.innerText = data.public_repos;
    followersCount.innerText = data.followers;
    followingCount.innerText = data.following;
    gistsCount.innerText = data.public_gists;
    avatar.src = data.avatar_url;
    if(!checkNull(data.name, name)){
        name.innerText = data.name;
    }
    userName.innerText = `@${data.login}`;
    const dateSegments = data.created_at.split('T').shift().split('-');
    date.innerText = `Joined ${dateSegments[2]} ${months[dateSegments[1] - 1]} ${dateSegments[0]}`;
    followButton.href = data.html_url;
    if(!checkNull(data.bio, bio)){
        bio.innerText = data.bio;
    }
    if(!checkNull(data.location, locationContainer)){
        location.innerText = data.location;
    }
    if(!checkNull(data.company, companyContainer)){
        company.innerText = data.company;
    }
    if(!checkNull(data.blog, blog)){
        blog.href = data.blog;
    }
    if(!checkNull(data.twitter_username, twitter)){
        twitter.href = `https://twitter.com/${data.twitter_username}`;
    }
};

const getData = async (username) => {
    addElement(loaderSection);
    removeElement(counterSection);
    removeElement(mainSection);
    removeElement(userNotFoundSection);
    try{
        const response = await fetch(`https://api.github.com/users/${username}`);
        if(!response.ok){
            throw new Error("User not found");
        }
        const data = await response.json();
        renderTheData(data);
        addElement(counterSection);
        addElement(mainSection);
        removeElement(loaderSection);
    }catch(error){
        addElement(userNotFoundSection);
        removeElement(loaderSection);
    }
};

getData('google');

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = searchInput.value;
    if(username === ''){
        return;
    }else{
        getData(username);
    }
});