CREATE OR REPLACE FUNCTION orderPayment()
  RETURNS table(type varchar, counts bigint)  AS

  $BODY$

      BEGIN
        RETURN QUERY SELECT payment_mode,COUNT(*) as count
        FROM orders 
        GROUP BY payment_mode
      END;

  $BODY$

  LANGUAGE 'plpgsql' 
