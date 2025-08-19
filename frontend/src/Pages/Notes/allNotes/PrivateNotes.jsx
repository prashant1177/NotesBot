import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../ui/Card/Card";

export default function PrivateNotes() {
  return (
    <div className="flex justify-center w-full">
      <div className="w-3/5">
        <h1 className="my-4 font-medium text-2xl">Your Notes</h1>
        <hr/>
        <div className=" grid grid-cols-4 gap-4 h-64 my-8">
          <Card>
            <CardHeader>
              <CardTitle>This is the title</CardTitle>
              <CardDescription>This is the card description</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}
