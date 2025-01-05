import {
    EventSubscriber,
    EntitySubscriberInterface,
    InsertEvent,
    UpdateEvent,
} from 'typeorm';
import { Locations } from './locations.entity';

@EventSubscriber()
export class LocationsSubscriber
    implements EntitySubscriberInterface<Locations>
{
    listenTo() {
        return Location;
    }

    async afterInsert(event: InsertEvent<Locations>): Promise<void> {
        const manager = event.manager;
        await manager.query(
            `
            UPDATE locations
            SET search_vector = 
                setweight(to_tsvector('russian', coalesce(address, '')), 'A') ||
                setweight(to_tsvector('english', coalesce(address, '')), 'B')
            WHERE id = $1;
        `,
            [event.entity.id],
        );
    }

    async afterUpdate(event: UpdateEvent<Locations>): Promise<void> {
        const manager = event.manager;
        await manager.query(
            `
            UPDATE locations
            SET search_vector = 
                setweight(to_tsvector('russian', coalesce(address, '')), 'A') ||
                setweight(to_tsvector('english', coalesce(address, '')), 'B')
            WHERE id = $1;
        `,
            [event.entity.id],
        );
    }
}
