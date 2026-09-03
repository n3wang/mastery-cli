
MERGE INTO CORPORATION AS corp
USING (  
SELECT * FROM (
    SELECT CONCAT('FL', '_', t.$1) AS pf_state_corpid,
    TRIM(t.$1) AS corporation_id,
    TRIM(t.$2) AS entity_email,
    ROW_NUMBER() OVER (PARTITION BY t.$1 ORDER BY METADATA$FILE_ROW_NUMBER DESC) AS row_num
    
    FROM @FL (FILE_FORMAT => csvformat, PATTERN => '.*email.*.*txt.*') AS t
) t 
WHERE t.row_num = 1
) AS src
ON corp.pf_state_corpid = src.pf_state_corpid
WHEN MATCHED THEN
    UPDATE SET
        corporation_id = src.corporation_id,
        entity_email = src.entity_email 
WHEN NOT MATCHED THEN
    INSERT (pf_id, pf_state_corpid)
    VALUES (src.corporation_id, src.pf_state_corpid);


CREATE OR REPLACE PROCEDURE update_corporation_fl_email_data()
RETURNS STRING
LANGUAGE SQL
AS
$$
BEGIN
    MERGE INTO CORPORATION AS corp
    USING (  
        SELECT * FROM (
            SELECT CONCAT('FL', '_', t.$1) AS pf_state_corpid,
            TRIM(t.$1) AS corporation_id,
            TRIM(t.$2) AS entity_email,
            ROW_NUMBER() OVER (PARTITION BY t.$1 ORDER BY METADATA$FILE_ROW_NUMBER DESC) AS row_num
            FROM @FL (FILE_FORMAT => csvformat, PATTERN => '.*email.*.*txt.*') AS t
        ) t 
        WHERE t.row_num = 1
    ) AS src
    ON corp.pf_state_corpid = src.pf_state_corpid
    WHEN MATCHED THEN
        UPDATE SET
            corporation_id = src.corporation_id,
            entity_email = src.entity_email 
    WHEN NOT MATCHED THEN
        INSERT (pf_id, pf_state_corpid)
        VALUES (src.corporation_id, src.pf_state_corpid);
    
    RETURN 'Merge operation completed successfully.';
END;
$$;


CALL update_corporation_fl_email_data();
