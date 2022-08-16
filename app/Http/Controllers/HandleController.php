<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use Illuminate\Database\Eloquent\Model;
use Inertia\Inertia;


class HandleController extends Controller
{
    
    public function filterEvent (Request $request)
    {   
        $this->validate($request, [
            'begin_date' => 'required',
            'end_date' => 'required'
        ]);

        $contractDateBegin = date('Y-m-d', strtotime($request->input("begin_date")));
        $contractDateEnd = date('Y-m-d', strtotime($request->input("end_date")));
        $tempArray = array();
        $events = Event::all();
        
        foreach($events as $event){
            $tempDate = date('Y-m-d', strtotime($event->date));
            if (($tempDate >= $contractDateBegin) && ($tempDate <= $contractDateEnd)){
                $tempArray[] = $event;
            }
        }
        
        return Inertia::render('Events/Index', [
            "events" => $tempArray
        ]);
        
    }

}
