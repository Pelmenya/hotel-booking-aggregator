DO
$do$
BEGIN
   IF NOT EXISTS (
      SELECT
      FROM   pg_catalog.pg_database
      WHERE  datname = 'aggregator') THEN

      CREATE DATABASE aggregator;
   END IF;
END
$do$;