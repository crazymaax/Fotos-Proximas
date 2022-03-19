export class Geolocation {

    static userLatitude = -23.5620287;
    static userLongitude = -46.6386148;

    static key = "fe721be12c2345058f97262654c661b9";
    static secret = "b109d867091fcf8c";
    static photosQty = 5

    static photos = []

    static index = 0

    static getLocation() {

        if("geolocation" in navigator){

            navigator.geolocation.getCurrentPosition(function (position){

                Geolocation.userLatitude = position.coords.latitude 
                Geolocation.userLongitude = position.coords.longitude
                
            },function() {

                const body = document.querySelector("body")

                const modalContainer = document.createElement("div")
                modalContainer.classList.add("modalContainer")

                const modal = document.createElement("div")
                modal.classList.add("modalContainer__modal", "fadein")
                
                const h3 = document.createElement("h3")
                h3.classList.add("modal__title")
                h3.innerText = "Erro!"

                const p = document.createElement("p")
                p.innerText = "Não foi possível coletar a localização atual, portanto, estamos lhe mostrando uma localização do centro de São Paulo, Liberdade 🥰"

                modal.appendChild(h3)
                modal.appendChild(p)
                modalContainer.appendChild(modal)
                body.appendChild(modalContainer)

                    setTimeout(() => {
                        modal.classList.add("fadeout")
                        remove()
                    }, 7000)


                function remove() {
                    setTimeout(() => {
                        modalContainer.remove()
                    }, 1000)
                }
            })

        }else{

            const body = document.querySelector("body")

            const modal = document.createElement("div")
            modal.classList.add("modal")

            const h3 = document.createElement("h3")
            h3.innerText = "Erro!"

            const p = document.createElement("p")
            p.innerText = "Não foi possível coletar a localização atual, portanto, estamos lhe mostrando uma localização do centro de São Paulo, Liberdade 🥰"

            modal.appendChild(h3)
            modal.appendChild(p)
            body.appendChild(modal)
        }

    }

    static urlFlickr(latitude, longitude, search) {
        const corsProxy = "https://shrouded-mountain-15003.herokuapp.com/";

        const url = `https://flickr.com/services/rest/?api_key=${Geolocation.key}&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=${Geolocation.photosQty}&lat=${latitude}&lon=${longitude}&text=${search}`

        return corsProxy + url
    }

    static async getImages(text) {

        const response = await fetch(Geolocation.urlFlickr(Geolocation.userLatitude, Geolocation.userLongitude, text))

        const data = await response.json()

        const info = data.photos.photo

        const photos = Geolocation.forEachImage(info)

        return photos
    }

    static forEachImage(photos) {
        const result=[]

        photos.forEach(element => {
            result.push({ title:element.title, owner:element.owner, url:this.constructImageURL(element) })
        });
        return result
    }

    static constructImageURL (photoObj) {
        return "https://farm" + photoObj.farm +
                ".staticflickr.com/" + photoObj.server +
                "/" + photoObj.id + "_" + photoObj.secret + ".jpg";
    }

    static async showImages(text){

        const selectedImages = await Geolocation.getImages(text)

        Geolocation.photos = []

        Geolocation.photos = [...selectedImages]

        Geolocation.index = 0
       
        if(selectedImages.length > 0){
            const figure = document.querySelector(".upperDiv")
            figure.innerHTML = `
            <img class="upperDiv__image" src="${selectedImages[0].url}" alt="${selectedImages[0].title}">
            <figcaption>${selectedImages[0].title}</figcaption>
            `

            const title = document.querySelector('.imageInfo__title')
            title.innerText = selectedImages[0].title

            const person = document.querySelector(".imageInfo__person")
            person.innerText = `Imagem tirada por: ${selectedImages[0].owner}`

        }else {
            const figure = document.querySelector(".upperDiv")
            figure.innerHTML = `
            <img class="upperDiv__image" src="../../../src/img/error.jpg" alt="Sem resultados">
            <figcaption>Sem resultados</figcaption>
            `

            const title = document.querySelector('.imageInfo__title')
            title.innerText = ""

            const person = document.querySelector(".imageInfo__person")
            person.innerText = ""
        }

        const infoDiv = document.querySelector(".bottomDiv")
        infoDiv.style.display = "flex"
    }

    static next() {
        if(Geolocation.photos.length > 0){

            Geolocation.index++
    
            if(Geolocation.index === Geolocation.photosQty){
                Geolocation.index = 0
            }
    
            const {title, owner, url} = Geolocation.photos[Geolocation.index]
    
            Geolocation.change(title, owner, url)
        }
        

    }

    static previous() {
        if(Geolocation.photos.length > 0){

            Geolocation.index--
    
            if(Geolocation.index === -1){
                Geolocation.index = Geolocation.photosQty -1
            }
    
            const {title, owner, url} = Geolocation.photos[Geolocation.index]
            Geolocation.change(title, owner, url)
        }

    }

    static change(title, owner, url) {

        const figure = document.querySelector(".upperDiv")
            figure.innerHTML = `
            <img class="upperDiv__image" src="${url}" alt="${title}">
            <figcaption>${title}</figcaption>
            `

            const newtitle = document.querySelector('.imageInfo__title')
            newtitle.innerText = title

            const person = document.querySelector(".imageInfo__person")
            person.innerText = `Imagem tirada por: ${owner}`
    }

}