import "@scss/common/components/Loading.scss"

interface LoadingI {
  className?: string
}

const Loading = (props: LoadingI) => {
  const { className } = props
  const loadingText = "...loading";

  return (
    <div className={`${className ? `loading-${className}` : ""} loading d-flex justify-content-center`}>
      {loadingText.split("").map((char, index) => (
        <span key={index} className="wave" style={{ animationDelay: `${index * 0.05}s` }}>
          {char}
        </span>
      ))}
    </div>
  )
};

export default Loading;