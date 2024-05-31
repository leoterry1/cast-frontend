import { HOST_DOMAIN } from "../../environment";

const TwitchLive = () => {
  return (
    <div className="h-screen">
      <h1 className="font-castFont font-semibold text-2xl my-2 text-castTitleDisabled">
        VIVO
      </h1>
      <div className="h-full flex">
        <div className="relative overflow-hidden w-3/4 h-5/6 mr-2">
          <iframe
            src={`https://player.twitch.tv/?channel=nanu_0_&parent=${HOST_DOMAIN}`}
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
        <div className="relative overflow-hidden w-1/4 h-5/6">
          <iframe
            src={`https://www.twitch.tv/embed/nanu_0_/chat?parent=${HOST_DOMAIN}`}
            className="w-full h-full"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default TwitchLive;
