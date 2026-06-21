import { Appointment } from "@/__generated__/graphql";
import { EventInput } from "@fullcalendar/core/index.js";

export interface AppointmentEvent extends Appointment, EventInput {
    id: string,               
    title: string,    
    start: string,      
    end: string,
}