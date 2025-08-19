import { Card, CardDescription, CardHeader, CardTitle } from "../../../ui/Card/Card";

export default function PublicNotes() {
  return (
      <div className="mx-48 grid grid-cols-4 gap-4 h-64 ">
      <Card>
        <CardHeader><CardTitle>This is the title</CardTitle>
        <CardDescription>This is the card description</CardDescription></CardHeader>
      </Card>
    </div>
  );
}
