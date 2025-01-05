import {
    EventSubscriber,
    EntitySubscriberInterface,
    InsertEvent,
    UpdateEvent,
} from 'typeorm';
import { Hotels } from './hotels.entity';

@EventSubscriber()
export class HotelsSubscriber implements EntitySubscriberInterface<Hotels> {
    listenTo() {
        return Hotels;
    }

    async afterInsert(event: InsertEvent<Hotels>): Promise<void> {
        const manager = event.manager;
        await manager.query(
            `
            UPDATE hotels
            SET search_vector = 
                setweight(to_tsvector('russian', coalesce(name, '') || ' ' || coalesce(name_en, '') || ' ' || coalesce(address, '')), 'A') ||
                setweight(to_tsvector('english', coalesce(name, '') || ' ' || coalesce(name_en, '') || ' ' || coalesce(address, '')), 'B')
            WHERE id = $1;
        `,
            [event.entity.id],
        );
    }

    async afterUpdate(event: UpdateEvent<Hotels>): Promise<void> {
        const manager = event.manager;
        await manager.query(
            `
            UPDATE hotels
            SET search_vector = 
                setweight(to_tsvector('russian', coalesce(name, '') || ' ' || coalesce(name_en, '') || ' ' || coalesce(address, '')), 'A') ||
                setweight(to_tsvector('english', coalesce(name, '') || ' ' || coalesce(name_en, '') || ' ' || coalesce(address, '')), 'B')
            WHERE id = $1;
        `,
            [event.entity.id],
        );
    }
}
