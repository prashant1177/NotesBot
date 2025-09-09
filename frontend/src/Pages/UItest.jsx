import Button from "../ui/Button/Button"; // adjust path as needed
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/Card/Card";
import Input from "../ui/Input/Input";

export default function UItest() {
  const handleClick = () => {
    alert("Button clicked!");
  };

  return (
    <div  className="w-full">
      <h1 className="text-center text-4xl font-bold mb-4">UI TESTING</h1>
    <div className="p-4 flex justify-evenly ">
      <div className="flex flex-col gap-4">
        <Button onClick={handleClick}>Default Button</Button>
        <Button varient="muted">Muted Button</Button>
        <Button varient="primary">primary Button</Button>
        <Button varient="accent">Accent Button</Button>
      </div>
      <Input className="border-2 text-slate-600 p-4" />
    </div>  
    <div className="mx-48 grid grid-cols-4 gap-4 h-64 ">
    <Card className="bg-blue-200">
        <CardHeader><CardTitle>this is card title</CardTitle>
        <CardDescription>This is desc</CardDescription></CardHeader>
      </Card>
    <Card className="bg-red-200">
        <CardHeader><CardTitle>this is card title</CardTitle>
        <CardDescription>This is desc</CardDescription></CardHeader>
      </Card>
    <Card  className="bg-yellow-200">
        <CardHeader><CardTitle>this is card title</CardTitle>
        <CardDescription>This is desc</CardDescription></CardHeader>
      </Card>
      
    <Card  className="bg-purple-200">
        <CardHeader><CardTitle>this is card title</CardTitle>
        <CardDescription>This is desc</CardDescription></CardHeader>
      </Card>
    </div>
     <div className="mx-48 grid grid-cols-4 gap-4 h-64 my-4">
    <Card>
        <CardHeader><CardTitle>this is card title</CardTitle>
        <CardDescription>This is desc</CardDescription></CardHeader>
      </Card>
    <Card>
        <CardHeader><CardTitle>this is card title</CardTitle>
        <CardDescription>This is desc</CardDescription></CardHeader>
      </Card>
    <Card >
        <CardHeader><CardTitle>this is card title</CardTitle>
        <CardDescription>This is desc</CardDescription></CardHeader>
      </Card>
      
    <Card >
        <CardHeader><CardTitle>this is card title</CardTitle>
        <CardDescription>This is desc</CardDescription></CardHeader>
      </Card>
    </div>
    </div>
  );
}
