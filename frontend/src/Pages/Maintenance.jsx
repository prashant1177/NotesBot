import UItest from "./UItest";

export default function Maintenance() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-center  min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold text-gray-950 mb-4">🚧 Site Under Maintenance 🚧</h1>
        <p className="text-lg text-muted mb-6">
          We are currently undergoing maintenance. Please check back later.
        </p>
        <p className="text-lg text-text mb-6">
         Reason: We are changing our server location to improve performance and ensure faster loading times for all users. Also changing website UI.
        </p>
      </div>
        <UItest />
    </div>
  );
}