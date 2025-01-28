"use client";
import Image from "next/image";
import { useState } from "react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import Picker from "./picker";

const generateDates = () => {
  const today = new Date();
  const daysInMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0
  ).getDate();
  return Array.from(
    { length: daysInMonth },
    (_, i) => ((today.getDate() + i - 1) % daysInMonth) + 1
  );
};

const infiniteLoop = (items: (string | number)[], repetitions = 4) => {
  return Array.from({ length: repetitions }, () => items).flat();
};

const hours = infiniteLoop(Array.from({ length: 12 }, (_, i) => i + 1));
const minutes = infiniteLoop(["00", "30"]);
const meridiem = infiniteLoop(["AM", "PM"]);
const days = infiniteLoop(generateDates());

export default function Home() {
  const [selectedDay, setSelectedDay] = useState(days[0]);
  const [selectedHour, setSelectedHour] = useState(hours[0]);
  const [selectedMinute, setSelectedMinute] = useState(minutes[0]);
  const [selectedMeridiem, setSelectedMeridiem] = useState(meridiem[0]);

  const handleConfirm = () => {
    alert(
      `Selected Time: ${selectedDay}, ${selectedHour}:${selectedMinute} ${selectedMeridiem}`
    );
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              src/app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Drawer>
            <DrawerTrigger asChild>
              <div className="h-[30px] w-[100px] bg-[#EAC578] rounded-md flex justify-center items-center cursor-pointer">
                <p className="text-black text-sm font-normal">WheelPicker</p>
              </div>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Reserve A Slot</DrawerTitle>
              </DrawerHeader>
              <div className="flex justify-around p-4 relative">
                <div className="flex flex-col items-center">
                  <Picker
                    optionGroups={{ days }}
                    valueGroups={{ days: selectedDay }}
                    onChange={(newVal) => setSelectedDay(newVal)}
                  />
                  <p className="text-black text-xs mt-2">Date</p>{" "}
                </div>
                <div className="flex flex-col items-center">
                  <Picker
                    optionGroups={{ hours }}
                    valueGroups={{ hours: selectedHour }}
                    onChange={(newVal) => setSelectedHour(newVal)}
                  />
                  <p className="text-black text-xs mt-2">Hour</p>{" "}
                </div>
                <div className="flex flex-col items-center ">
                  <Picker
                    optionGroups={{ minutes }}
                    valueGroups={{ minutes: selectedMinute }}
                    onChange={(newVal) => setSelectedMinute(newVal)}
                  />
                  <p className="text-black text-xs mt-2">Minutes</p>{" "}
                </div>
                <div className="flex flex-col items-center">
                  <Picker
                    optionGroups={{ meridiem }}
                    valueGroups={{ meridiem: selectedMeridiem }}
                    onChange={(newVal) => setSelectedMeridiem(newVal)}
                  />
                  <p className="text-black text-xs mt-2">AM/PM</p>{" "}
                </div>
              </div>
              <DrawerFooter>
                <Button className="bg-yellow-500" onClick={handleConfirm}>
                  Confirm
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center"
          target="_blank"
          rel="noopener noreferrer"
        >
          Follow me on
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://x.com/ItsArunK_"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/twitter.jpg"
            alt="Twitter icon"
            width={16}
            height={16}
          />
          Twitter
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/AronnK"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/github.png"
            alt="Github icon"
            width={16}
            height={16}
          />
          Github
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.linkedin.com/in/karthic-arun/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/linkedin.jpg"
            alt="LinkedIn icon"
            width={16}
            height={16}
          />
          LinkedIn
        </a>
      </footer>
    </div>
  );
}
