import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/EventCard";
import {IEvent} from "@/database";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const instant = false;

const Page = async () => {
    const response = await fetch(`${BASE_URL}/api/events`, { cache: 'no-store' });
    if (!response.ok) {
        throw new Error(`Failed to fetch events: ${response.status} ${response.statusText}`);
    }
    const { events } = await response.json();

    return (
        <section>
            <h1 className="text-center">The Hub for Every Dev <br /> Event You Can't Miss</h1>
            <p className="text-center mt-5">Hackathons, Meetups, and Conferences, All in One Place</p>

            <ExploreBtn />

            <div className="mt-20 space-y-7">
                <h3>Featured Events</h3>

                <ul id="events" className="events">
                    {events && events.length > 0 ? events.map((event: IEvent) => (
                        <li key={event.title} className="list-none">
                            <EventCard {...event} />
                        </li>
                    )) : (
                        <li className="list-none">No events available yet.</li>
                    )}
                </ul>
            </div>
        </section>
    )
}

export default Page;