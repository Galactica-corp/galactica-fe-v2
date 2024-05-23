import taskIconPng from "./task-icon.png";

export const ToastTask = () => {
  return (
    <div className="flex gap-x-5">
      <img alt="task" src={taskIconPng} />
      <div className="flex flex-col">
        <div>
          You have successfully completed <b>I’m not a Robot</b> task!
        </div>
        <div className="flex gap-x-5">
          <button>Reward: 50</button>
          <p>Go to Onboarding</p>
        </div>
      </div>
    </div>
  );
};
