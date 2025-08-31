import Button from "../../../ui/Button/Button";
import { Dot, UsersRound } from "lucide-react";
export default function MyProfile({
  author,
  follow,
  following,
  followersCount,
  followingCount,
}) {
  return (
    <div className=" w-full mt-8 p-4">
      <div className="flex flex-col space-y-8">
        <div>
          {" "}
          <h1 className="text-2xl font-medium mb-1 text-gray-900">
            {author.fullname}
          </h1>
          <h1 className="text-gray-600">{author?.userabout}</h1>
        </div>
      </div>
    </div>
  );
}
