import EventCardGroup from "../../components/Event/EventCardGroup/EventCardGroup"
import HomepageLayout from "../../components/HomepageLayout/HomepageLayout"

const PastEvents = () => {
    return (
        <HomepageLayout header="Past Events">
            <EventCardGroup eventDetails={[
                {
                    title: "Gathering Event",
                    date: "10/08/2024",
                    description: "Everyone can join!",
                },
            ]} />
        </HomepageLayout>
    )
}

export default PastEvents
