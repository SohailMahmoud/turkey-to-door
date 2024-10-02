import CarouselHero from "../CarouselHero/CarouselHero"
import Categories from "../Categories/Categories"
import FlashOffer from "../FlashOffer/FlashOffer"
import ProductList from "../ProductsList/ProductsList"
import Newsletter from "../Newsletter/Newsletter"

export default function HomePage() {
    return (
        <>
            <CarouselHero />
            <Categories />
            <FlashOffer />
            <ProductList />
            <Newsletter />
        </>
    )
}