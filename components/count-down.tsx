"use client";

import { useState, useRef, useEffect, ChangeEvent, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components//ui/button";

export default function Countdown (){
    const [duration,setDuration] = useState<number>(0);
    const [timeLeft,setTimeLeft] = useState<number>(0);
    const [status, setStatus] = useState<'inactive' | 'active' | 'paused'>('inactive');
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const handleSetDuration = useCallback(() => {
        if(duration > 0){
            setTimeLeft(duration);
            setStatus('inactive');
            if(timerRef.current){
                clearInterval(timerRef.current)
            }
        }
    },[duration]);

    const handleStart = useCallback(() => {
        if (timeLeft > 0) {
            setStatus(status === 'paused' ? 'active' : 'active');
        }
    }, [timeLeft, status]);

    const handlePause = useCallback(() => {
        if (status === 'active') {
            setStatus('paused');
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        }
    }, [status]);

    const handleReset = useCallback(() => {
        setStatus('inactive');
        setTimeLeft(duration);
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
    }, [duration]);


    useEffect(() => {
        if(status === 'active'){
            timerRef.current = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if(prevTime <= 1){
                        clearInterval(timerRef.current!);
                        return 0;
                    }
                    return prevTime - 1;
                });

            }, 1000);
        }
        return () => {
            if(timerRef.current){
                clearInterval(timerRef.current)
            }
        };
    }, [status]);

    const formatTime = (time:number) : string => {
        const minutes = Math.floor(time/60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
    };

    const handleDurationChange = (e: ChangeEvent<HTMLInputElement>):void => {
        setDuration(Number(e.target.value) || 0);
    };
    return(
        <div className="flex flex-col items-center justify-center h-screen bg-blue-100 dark:bg-blue-900">
            <div className="bg-white dark:bg-green-800 shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-black-600 dark:text-blue-200 text-center">
                 Countdown Timer By Saba Zain
                </h1>
                <div className="flex items-center mb-6">
                    <Input 
                    type="number"
                    id="duration"
                    placeholder="Enter duration in seconds"
                    value={duration}
                    onChange={handleDurationChange}
                    className="flex-1 mr-4 rounded-md border-gray-800 dark:border-gray-800 dark:bg-gray-700 dark:text-white-200"
                    />
                    <Button
                    onClick={handleSetDuration}
                    variant="outline"
                    className="text-red-800 dark:text-red-200"
                    >
                    Set
                    </Button>
                    </div>
                    <div className="flex flex-col items-center justify-center text-4xl font-bold mt-6 text-gray-800 dark:text-gray-200 border-gray-900">
                    {formatTime(timeLeft)}
                </div><br></br>
                
                <div className="flex justify-center gap-4">
                    <Button
                    onClick={handleStart}
                    variant="outline"
                    className="dark:text-red-800 dark:text-gray-200 border-gray-900"
                    >
                      {status === "paused" ? "Resume" : "Start"}
                    </Button>
                    <Button
                    onClick={handlePause}
                    variant="outline"
                    className="dark:text-red-800 dark:text-gray-200 border-gray-900"
                    >
                     Pause
                    </Button>
                    <Button
                    onClick={handleReset}
                    variant="outline"
                    className="dark:text-red-800 dark:text-gray-200 border-gray-900"
                    >
                     Reset
                    </Button>

                </div>
                

            </div>

        </div>
    );
}
    

        
            
