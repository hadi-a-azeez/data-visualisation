CREATE OR REPLACE FUNCTION resellerCount()
  RETURNS table(type varchar, counts bigint)  AS

  $BODY$

      BEGIN
        RETURN QUERY SELECT is_reseller,COUNT(*) as count
        FROM orders 
        GROUP BY is_reseller
      END;

  $BODY$

  LANGUAGE 'plpgsql' 
