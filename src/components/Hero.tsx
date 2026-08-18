type HeroProps = {
  title: string;
  description: string;
  updateState: () => void;
};

function Hero({ title, description, updateState }: HeroProps) {
  return (
    <>
      <h1>{title}</h1>
      <p>{description}</p>

      <button onClick={updateState}>Explore Collaborations</button>
    </>
  );
}

export default Hero;
