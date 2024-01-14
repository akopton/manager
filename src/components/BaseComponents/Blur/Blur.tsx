type BlurProps = {
  onClick?: () => void;
};

export const Blur = (props: BlurProps) => {
  const { onClick } = props;

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className="fixed left-0 top-0 h-full w-full" onClick={handleClick} />
  );
};
