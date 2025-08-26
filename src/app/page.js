import BackToTopButton from "@/Components/BackToTopButton";
import HeroPage from "@/Components/HeroPage";

export default function Page({ children }) {
  return (
    <>
      <HeroPage />
      <BackToTopButton />
    </>
  );
}
