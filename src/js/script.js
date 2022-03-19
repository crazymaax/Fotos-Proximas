import { Geolocation } from "./models/Geolocation.js";

Geolocation.getLocation()

const searchButton = document.querySelector(".nav___button")
searchButton.addEventListener("click", (e) => {
    const text = e.target.parentNode.children[0].value

    Geolocation.showImages(text)
})

const nextButton = document.querySelector(".buttons__next")
nextButton.addEventListener("click", Geolocation.next)

const previousButton = document.querySelector(".buttons__previous")
previousButton.addEventListener("click", Geolocation.previous)

const peopleButton = document.querySelector(".sugestions__people")
peopleButton.addEventListener("click", () => {
    Geolocation.showImages("Pessoas")
})

const decorationButton = document.querySelector(".sugestions__decoration")
decorationButton.addEventListener("click", () => {
    Geolocation.showImages("Decoração")
})

const homeOfficeButton = document.querySelector(".sugestions__homeOffice")
homeOfficeButton.addEventListener("click", () => {
    Geolocation.showImages("Home Office")
})